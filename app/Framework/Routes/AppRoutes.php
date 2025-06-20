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

        $app->get('/psw-recovery', function ($request, $response) {
            require_once __DIR__ . '/../../views/pages/psw-recovery.php';
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

        $app->get('/dashboard', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/dashboard.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/properties', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/properties.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/agents', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/agents.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/packages', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/packages.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/expense-reports', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/expense-reports.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);
        
        $app->get('/property-types', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/property-types.php';
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

        $app->get('/agent/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['aid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/agent-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);
        
        $app->get('/package/{id}', function ($request, $response) {
            $pid = $request->getAttribute('id');
            extract(['pid' => $pid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/package-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/property/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['pid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/property-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

    }
}
