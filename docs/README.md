## Auth Gateway da São Paulo Urbanismo

### url base <Badge text="GET" />
Todos os usuários<br>
[http://localhost:5000/auth-gateway-spurb/0.0.1](http://localhost:5000/auth-gateway-spurb/0.0.1)
- method: GET

---
### :id <Badge text="GET" />
Um usuário<br>
[http://localhost:5000/auth-gateway-spurb/0.0.1/:id](http://localhost:5000/auth-gateway-spurb/0.0.1)
- method: GET

---
### cadastrar <Badge text="POST" type="warning"/>
Cria um usuário<br>
[http://localhost:5000/auth-gateway-spurb/0.0.1/cadastrar](http://localhost:5000/auth-gateway-spurb/0.0.1/cadastrar)
- method: POST
- bodyParams:
```json
{
	 "email": "usuario@teste.com",
	 "password":"123456",
	 "nrprodam": "e0545454" // opcional
}
```
---
### login <Badge text="POST" type="warning"/>
Cria autorização<br>
[http://localhost:5000/auth-gateway-spurb/0.0.1/login](http://localhost:5000/auth-gateway-spurb/0.0.1/login)
- method: POST
- bodyParams:
```json
{
	 "email": "usuario@teste.com",
	 "password":"123456"
}
```
---
### logout  <Badge text="DELETE" type="error"/>
Deleta autorização <br>
[http://localhost:5000/auth-gateway-spurb/0.0.1/logout](http://localhost:5000/auth-gateway-spurb/0.0.1/logout)
- path: /logout
- method: DELETE
- headers:
```json
	{
		"authorization": "api-res-token"
	}
```
---
### id <Badge text="DELETE" type="error"/>
Deleta usuário

[http://localhost:5000/auth-gateway-spurb/0.0.1/:id](http://localhost:5000/auth-gateway-spurb/0.0.1/3)
- method: DELETE
- headers:
```json
{
	"authorization": "api-res-token"
}
```