<?php

namespace App\Framework\Middlewares;

use App\Framework\Models\User;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class JWTMiddleware {
    private array $allowedUrls;

    public function __construct()  {
        $this->allowedUrls = [
            '/',
            '/api/sign-in',
            '/api/auth-renew',
            '/api/auth-validate',
        ];
    }

    /**
     * @throws Exception
     */
    public function __invoke(Request $request, RequestHandler $handler): Response  {
        try {
            $uri = $request->getUri()->getPath();
            if (in_array($uri, $this->allowedUrls)) return $handler->handle($request);
            $user = User::GetTokenInfo($request);
            if(empty($user)) throw new Exception("Invalid token", 401);
            if($user['exp'] < time()) throw new Exception("Token expired", 401);
            $request = $request->withAttribute('user', $user);
            return $handler->handle($request);
        } catch (Exception $ex) {
            if($ex->getCode() == 401) {
                $response = new \Slim\Psr7\Response(302);
                return $response->withHeader('Location', '/');
            }
            throw $ex;
        }
    }
}
