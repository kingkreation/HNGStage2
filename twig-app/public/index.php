<?php
session_start();

// Set error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define base path
define('BASE_PATH', dirname(__DIR__));
define('PUBLIC_PATH', __DIR__);

// Autoload
require_once BASE_PATH . '/vendor/autoload.php';

// Initialize Twig
$twigLoader = new \Twig\Loader\FilesystemLoader(BASE_PATH . '/templates');
$twig = new \Twig\Environment($twigLoader);

// Include service files
require_once BASE_PATH . '/src/AuthService.php';
require_once BASE_PATH . '/src/TicketService.php';

use App\AuthService;
use App\TicketService;

// Get the requested route
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_uri = str_replace('/twig-app/public', '', $request_uri);
if (empty($request_uri) || $request_uri === '/') {
    $request_uri = '/';
}

// Route handling
try {
    if ($request_uri === '/' || $request_uri === '') {
        echo $twig->render('landing.html', [
            'isAuthenticated' => AuthService::isAuthenticated()
        ]);
    } 
    elseif ($request_uri === '/auth/login') {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            $result = AuthService::login($email, $password);
            
                if ($result['ok']) {
                $_SESSION['ticketapp_session'] = json_encode([
                    'token' => 'mock-token-' . time(),
                    'user' => [
                        'id' => $result['user']['id'],
                        'name' => $result['user']['name'],
                        'email' => $result['user']['email']
                    ]
                ]);
                header('Location: /dashboard');
                exit;
            } else {
                $error = $result['message'];
            }
        }
        
        echo $twig->render('login.html', [
            'error' => $error ?? null
        ]);
    }
    elseif ($request_uri === '/auth/signup') {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            $confirmPassword = $_POST['confirmPassword'] ?? '';
            
            $result = AuthService::signup($name, $email, $password, $confirmPassword);
            
                if ($result['ok']) {
                $_SESSION['ticketapp_session'] = json_encode([
                    'token' => 'mock-token-' . time(),
                    'user' => [
                        'id' => $result['user']['id'],
                        'name' => $result['user']['name'],
                        'email' => $result['user']['email']
                    ]
                ]);
                header('Location: /dashboard');
                exit;
            } else {
                $errors = $result['errors'] ?? [];
            }
        }
        
        echo $twig->render('signup.html', [
            'errors' => $errors ?? []
        ]);
    }
    elseif ($request_uri === '/dashboard') {
            if (!AuthService::isAuthenticated()) {
            header('Location: /auth/login');
            exit;
        }
        
        $session = AuthService::getSession();
        $stats = TicketService::getStats();
        
        echo $twig->render('dashboard.html', [
            'user' => $session['user'] ?? [],
            'stats' => $stats,
            'isAuthenticated' => true
        ]);
    }
    elseif ($request_uri === '/tickets') {
            if (!AuthService::isAuthenticated()) {
            header('Location: /auth/login');
            exit;
        }
        
        $filterStatus = $_GET['status'] ?? 'all';
        $tickets = TicketService::getAllTickets();
        
        if ($filterStatus !== 'all') {
            $tickets = array_filter($tickets, fn($t) => $t['status'] === $filterStatus);
        }
        
        echo $twig->render('tickets.html', [
            'tickets' => array_values($tickets),
            'filterStatus' => $filterStatus,
            'isAuthenticated' => true
        ]);
    }
    elseif ($request_uri === '/api/tickets' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!AuthService::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'message' => 'Unauthorized']);
            exit;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        $result = TicketService::createTicket($data);
        header('Content-Type: application/json');
        echo json_encode($result);
    }
    elseif (preg_match('/^\/api\/tickets\/(\d+)$/', $request_uri, $matches)) {
        if (!AuthService::isAuthenticated()) {
            http_response_code(401);
            echo json_encode(['ok' => false, 'message' => 'Unauthorized']);
            exit;
        }
        
        $id = (int)$matches[1];
        
        if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            $result = TicketService::updateTicket($id, $data);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $result = TicketService::deleteTicket($id);
        } else {
            $result = TicketService::getTicketById($id);
        }
        
        header('Content-Type: application/json');
        echo json_encode($result);
    }
    elseif ($request_uri === '/logout') {
        AuthService::logout();
    header('Location: /');
        exit;
    }
    else {
    header('Location: /');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo "Error: " . htmlspecialchars($e->getMessage());
}