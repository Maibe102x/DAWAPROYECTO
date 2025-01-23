from flask_restful import Resource
from ws_usuario.src.api.Components.user_component import UserComponent
from ws_usuario.src.utils.general.logs import HandleLogs
from ws_usuario.src.utils.general.response import response_error, response_success

class UserService(Resource):
    @staticmethod
    def get(user_id):
        try:
            user = UserComponent.get_user_by_id(user_id)
            if user and user['result']:
                # Ajustamos los datos al formato deseado (si es necesario)
                user_data = user['data']
                return response_success({
                    "image_url": user_data.get("u_image_url"),
                    "username": user_data.get("u_login"),
                    "email": user_data.get("u_email"),
                    "password": user_data.get("u_password"),
                    "modified": user_data.get("u_updated_at")
                })
            return response_error("Usuario no encontrado.")
        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error al obtener el usuario.")