<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use Slim\App;

class AppRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(App $app): void {
        $app->get('/', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/sign-in.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        });

        $app->get('/settings', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/settings.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/user-profile', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/user-profile.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/users', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/users.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/contacts', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/contacts.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/companies', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/companies.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/user/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['cid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/user-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/contact/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['cid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/contact-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/contact/pie/{list_id}/{status_id}', function ($request, $response) {
            $lid = $request->getAttribute('list_id');
            $sid = $request->getAttribute('status_id');
            extract(['list_id' => $lid, 'status_id' => $sid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/contact-pie.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/company/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['cid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/company-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/dashboard', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/dashboard.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/calendar', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/calendar.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);
    }
}
