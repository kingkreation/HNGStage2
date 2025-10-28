<?php

namespace App;

class AuthService {
    const SESSION_KEY = 'ticketapp_session';
    const DEMO_EMAIL = 'demo@ticketapp.test';
    const DEMO_PASSWORD = 'Password123!';

    public static function login($email, $password) {
        if (empty($email) || empty($password)) {
            return ['ok' => false, 'message' => 'Email and password are required'];
        }

        if ($email === self::DEMO_EMAIL && $password === self::DEMO_PASSWORD) {
            return [
                'ok' => true,
                'user' => [
                    'id' => 1,
                    'name' => 'Demo User',
                    'email' => $email
                ]
            ];
        }

        return ['ok' => false, 'message' => 'Invalid email or password'];
    }

    public static function signup($name, $email, $password, $confirmPassword) {
        $errors = [];

        if (empty($name)) {
            $errors['name'] = 'Name is required';
        }

        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Valid email is required';
        }

        if (empty($password) || strlen($password) < 8) {
            $errors['password'] = 'Password must be at least 8 characters';
        }

        if ($password !== $confirmPassword) {
            $errors['confirmPassword'] = 'Passwords do not match';
        }

        if (!empty($errors)) {
            return ['ok' => false, 'errors' => $errors];
        }

        return [
            'ok' => true,
            'user' => [
                'id' => time(),
                'name' => $name,
                'email' => $email
            ]
        ];
    }

    public static function logout() {
        unset($_SESSION[self::SESSION_KEY]);
        session_destroy();
    }

    public static function getSession() {
        if (isset($_SESSION[self::SESSION_KEY])) {
            return json_decode($_SESSION[self::SESSION_KEY], true);
        }
        return null;
    }

    public static function isAuthenticated() {
        return isset($_SESSION[self::SESSION_KEY]);
    }
}