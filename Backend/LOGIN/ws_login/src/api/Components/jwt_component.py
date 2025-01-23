import jwt
import pytz
from datetime import datetime, timedelta
from ws_login.src.utils.general.logs import HandleLogs
revoked_tokens = set()
class JWTComponent:
    SECRET_KEY = "secreto_super_seguro"  # variables de entorno en producción

    @staticmethod
    def token_generate(p_user):
        """Genera un token JWT con un tiempo de expiración de 15 minutos."""
        try:
            timezone = pytz.timezone('America/Guayaquil')

            # Payload del JWT
            payload = {
                'iat': datetime.now(tz=timezone).timestamp(),  # Emitido en
                'exp': (datetime.now(tz=timezone) + timedelta(minutes=15)).timestamp(),  # Expira en
                'username': p_user  # Información del usuario
            }

            # Generar el token
            token = jwt.encode(payload, JWTComponent.SECRET_KEY, algorithm='HS256')
            return token

        except Exception as err:
            HandleLogs.write_log(f"Ocurrió un error al generar el token para el usuario {p_user}")
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def token_validate(p_token):
        """Valida el token JWT y verifica que no esté expirado."""
        try:
            # Decodificar el token
            payload = jwt.decode(p_token, JWTComponent.SECRET_KEY, algorithms=['HS256'])
            print("Payload decodificado:", payload)
            return True  # Token válido

        except jwt.ExpiredSignatureError:
            HandleLogs.write_log("El token ha expirado.")
            return False
        except jwt.InvalidTokenError as err:
            HandleLogs.write_log("Token inválido.")
            HandleLogs.write_error(err)
            return False

    @staticmethod
    def invalidate_token(p_token):
        """Marca un token como revocado."""
        try:
            # Decodificar el token para asegurarnos de que es válido
            payload = jwt.decode(p_token, JWTComponent.SECRET_KEY, algorithms=['HS256'])
            # Agregar el token a la lista de revocación
            revoked_tokens.add(p_token)
            return {"result": True, "message": "Token revocado con éxito"}
        except jwt.ExpiredSignatureError:
            return {"result": False, "message": "El token ya expiró, no es necesario revocarlo"}
        except jwt.InvalidTokenError as err:
            return {"result": False, "message": f"Token inválido: {str(err)}"}



















