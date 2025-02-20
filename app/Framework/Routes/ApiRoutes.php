<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\ExpenseReport;
use App\Framework\Models\User;
use App\Framework\Models\Property;
use App\Framework\Models\Agent;
use App\Framework\Models\Package;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

class ApiRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(App $app): void
    {
        $app->group('/api', function (RouteCollectorProxy $group) {
            $group->post('/sign-in', function ($request, $response) {
                return User::SignIn($request, $response);
            });

            $group->post('/auth-renew', function ($request, $response) {
                return User::AuthRenew($request, $response);
            });

            $group->post('/auth-validate', function ($request, $response) {
                return User::AuthValidate($request, $response);
            });

            $group->get('/dashboard', function ($request, $response) {
                return User::Dashboard($request, $response);
            })->add($this->authMiddleware);

            $group->post('/reset-psw', function ($request, $response) {
                return User::ResetPassword($request, $response);
            })->add($this->authMiddleware);

            // Entity's list routes

            $group->get('/users', function ($request, $response) {
                return User::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/agents', function ($request, $response) {
                return Agent::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/properties', function ($request, $response) {
                return Property::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/packages', function ($request, $response) {
                return Package::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/expense-reports', function ($request, $response) {
                return ExpenseReport::GetAll($request, $response);
            })->add($this->authMiddleware);

            // Entity's routes

            $userRoutes = new UserRoutes($this->authMiddleware);
            $group->group('/user', function (RouteCollectorProxy $userGroup) use ($userRoutes) {
                $userRoutes->register($userGroup);
            });

            $agentRoutes = new AgentRoutes($this->authMiddleware);
            $group->group('/agent', function (RouteCollectorProxy $agentGroup) use ($agentRoutes) {
                $agentRoutes->register($agentGroup);
            });

            $propertyRoutes = new PropertyRoutes($this->authMiddleware);
            $group->group('/property', function (RouteCollectorProxy $propertyGroup) use ($propertyRoutes) {
                $propertyRoutes->register($propertyGroup);
            });

            $packageRoutes = new PackageRoutes($this->authMiddleware);
            $group->group('/package', function (RouteCollectorProxy $packageGroup) use ($packageRoutes) {
                $packageRoutes->register($packageGroup);
            });

            $packageRoutes = new PackageRoutes($this->authMiddleware);
            $group->group('/expense-report', function (RouteCollectorProxy $packageGroup) use ($packageRoutes) {
                $packageRoutes->register($packageGroup);
            });
        });
    }
}
