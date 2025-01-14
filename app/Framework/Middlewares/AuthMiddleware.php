<?php

namespace App\Framework\Middlewares;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as SlimResponse;

class AuthMiddleware {
    /**
     * @throws \Exception
     */
    public function __invoke(Request $request, RequestHandler $handler): Response {
        $user = $request->getAttribute('user');
        if(!$user) {
            $response = new \Slim\Psr7\Response(302);
            return $response->withHeader('Location', '/');
        }
        return $handler->handle($request);
    }
}
