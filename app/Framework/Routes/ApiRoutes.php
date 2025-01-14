<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\Company;
use App\Framework\Models\Contact;
use App\Framework\Models\ContactActivity;
use App\Framework\Models\User;
use Slim\App;
use Slim\Exception\HttpNotImplementedException;
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

            $group->get('/contact-activity-status', function ($request, $response) {
                return ContactActivity::GetAllStatus($request, $response);
            })->add($this->authMiddleware);

            // Entity's list routes

            $group->get('/users', function ($request, $response) {
                return User::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/contacts', function ($request, $response) {
                return Contact::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/companies', function ($request, $response) {
                return Company::GetAll($request, $response);
            })->add($this->authMiddleware);

            $group->get('/calendars', function ($request, $response) {
                throw new HttpNotImplementedException($request, "calendars entry point is not implemented");
            })->add($this->authMiddleware);

            $group->get('/requests', function ($request, $response) {
                throw new HttpNotImplementedException($request, "requests entry point is not implemented");
            })->add($this->authMiddleware);

            $group->get('/contact-activities', function ($request, $response) {
                throw new HttpNotImplementedException($request, "contact-activities entry point is not implemented");
            })->add($this->authMiddleware);

            // Entity's routes

            $userRoutes = new UserRoutes($this->authMiddleware);
            $group->group('/user', function (RouteCollectorProxy $userGroup) use ($userRoutes) {
                $userRoutes->register($userGroup);
            });

            $requestRoutes = new RequestRoutes($this->authMiddleware);
            $group->group('/request', function (RouteCollectorProxy $requestGroup) use ($requestRoutes) {
                $requestRoutes->register($requestGroup);
            });

            $contactRoutes = new ContactRoutes($this->authMiddleware);
            $group->group('/contact', function (RouteCollectorProxy $contactGroup) use ($contactRoutes) {
                $contactRoutes->register($contactGroup);
            });

            $companyRoutes = new CompanyRoutes($this->authMiddleware);
            $group->group('/company', function (RouteCollectorProxy $companyGroup) use ($companyRoutes) {
                $companyRoutes->register($companyGroup);
            });

            $calendarRoutes = new CalendarRoutes($this->authMiddleware);
            $group->group('/calendar', function (RouteCollectorProxy $calendarGroup) use ($calendarRoutes) {
                $calendarRoutes->register($calendarGroup);
            });

            $contactActivityRoutes = new ContactActivityRoutes($this->authMiddleware);
            $group->group('/contact-activity', function (RouteCollectorProxy $contactActivityGroup) use ($contactActivityRoutes) {
                $contactActivityRoutes->register($contactActivityGroup);
            });
        });
    }
}
