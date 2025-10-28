<?php

namespace App;

class TicketService {
    const TICKETS_FILE = BASE_PATH . '/data/tickets.json';

    public static function initializeTickets() {
        if (!file_exists(self::TICKETS_FILE)) {
            if (!is_dir(dirname(self::TICKETS_FILE))) {
                mkdir(dirname(self::TICKETS_FILE), 0755, true);
            }

            $initialTickets = [
                [
                    'id' => 1,
                    'title' => 'Fix login bug',
                    'description' => 'Users unable to login with special characters in password',
                    'status' => 'open',
                    'priority' => 'high',
                    'createdAt' => time() * 1000 - 86400000,
                    'updatedAt' => time() * 1000 - 86400000
                ],
                [
                    'id' => 2,
                    'title' => 'Update dashboard UI',
                    'description' => 'Redesign dashboard for better UX',
                    'status' => 'in_progress',
                    'priority' => 'medium',
                    'createdAt' => time() * 1000 - 172800000,
                    'updatedAt' => time() * 1000 - 86400000
                ],
                [
                    'id' => 3,
                    'title' => 'Add dark mode',
                    'description' => 'Implement dark theme option',
                    'status' => 'closed',
                    'priority' => 'low',
                    'createdAt' => time() * 1000 - 259200000,
                    'updatedAt' => time() * 1000 - 172800000
                ]
            ];

            file_put_contents(self::TICKETS_FILE, json_encode($initialTickets, JSON_PRETTY_PRINT));
        }
    }

    public static function getAllTickets() {
        self::initializeTickets();
        $json = file_get_contents(self::TICKETS_FILE);
        return json_decode($json, true) ?: [];
    }

    public static function getTicketById($id) {
        $tickets = self::getAllTickets();
        foreach ($tickets as $ticket) {
            if ($ticket['id'] == $id) {
                return ['ok' => true, 'data' => $ticket];
            }
        }
        return ['ok' => false, 'message' => 'Ticket not found'];
    }

    public static function createTicket($data) {
        $validation = self::validateTicket($data);
        if (!$validation['ok']) {
            return $validation;
        }

        $tickets = self::getAllTickets();
        $newId = max(array_column($tickets, 'id')) + 1;

        $newTicket = [
            'id' => $newId,
            'title' => trim($data['title'] ?? ''),
            'description' => trim($data['description'] ?? ''),
            'status' => $data['status'] ?? 'open',
            'priority' => $data['priority'] ?? 'low',
            'createdAt' => time() * 1000,
            'updatedAt' => time() * 1000
        ];

        $tickets[] = $newTicket;
        file_put_contents(self::TICKETS_FILE, json_encode($tickets, JSON_PRETTY_PRINT));

        return [
            'ok' => true,
            'data' => $newTicket,
            'message' => 'Ticket created successfully'
        ];
    }

    public static function updateTicket($id, $data) {
        $validation = self::validateTicket($data);
        if (!$validation['ok']) {
            return $validation;
        }

        $tickets = self::getAllTickets();
        $found = false;

        foreach ($tickets as &$ticket) {
            if ($ticket['id'] == $id) {
                $ticket['title'] = trim($data['title'] ?? '');
                $ticket['description'] = trim($data['description'] ?? '');
                $ticket['status'] = $data['status'] ?? 'open';
                $ticket['priority'] = $data['priority'] ?? 'low';
                $ticket['updatedAt'] = time() * 1000;
                $found = true;
                break;
            }
        }

        if (!$found) {
            return ['ok' => false, 'message' => 'Ticket not found'];
        }

        file_put_contents(self::TICKETS_FILE, json_encode($tickets, JSON_PRETTY_PRINT));

        return [
            'ok' => true,
            'data' => $ticket,
            'message' => 'Ticket updated successfully'
        ];
    }

    public static function deleteTicket($id) {
        $tickets = self::getAllTickets();
        $initialCount = count($tickets);

        $tickets = array_filter($tickets, fn($t) => $t['id'] != $id);

        if (count($tickets) === $initialCount) {
            return ['ok' => false, 'message' => 'Ticket not found'];
        }

        file_put_contents(self::TICKETS_FILE, json_encode(array_values($tickets), JSON_PRETTY_PRINT));

        return ['ok' => true, 'message' => 'Ticket deleted successfully'];
    }

    public static function getStats() {
        $tickets = self::getAllTickets();
        return [
            'total' => count($tickets),
            'open' => count(array_filter($tickets, fn($t) => $t['status'] === 'open')),
            'inProgress' => count(array_filter($tickets, fn($t) => $t['status'] === 'in_progress')),
            'closed' => count(array_filter($tickets, fn($t) => $t['status'] === 'closed'))
        ];
    }

    private static function validateTicket($data) {
        $errors = [];

        if (empty($data['title'] ?? '')) {
            $errors['title'] = 'Title is required';
        }

        if (empty($data['status'] ?? '')) {
            $errors['status'] = 'Status is required';
        } elseif (!in_array($data['status'], ['open', 'in_progress', 'closed'])) {
            $errors['status'] = 'Status must be one of: open, in_progress, closed';
        }

        if (!empty($data['description'] ?? '') && strlen(trim($data['description'])) < 10) {
            $errors['description'] = 'Description must be at least 10 characters';
        }

        if (!empty($data['priority'] ?? '') && !in_array($data['priority'], ['low', 'medium', 'high'])) {
            $errors['priority'] = 'Priority must be one of: low, medium, high';
        }

        if (!empty($errors)) {
            return ['ok' => false, 'message' => 'Validation failed', 'errors' => $errors];
        }

        return ['ok' => true];
    }
}