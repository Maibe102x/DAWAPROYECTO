from flask_restful import Resource
from ws_publicaciones.src.api.Components.post_component import PostComponent
from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.utils.general.response import response_error, response_success

class PostService(Resource):
    @staticmethod
    def get(u_login, post_id):
        try:
            # Validaciones iniciales de los parámetros
            if not isinstance(u_login, str) or not u_login.strip():
                return response_error("El parámetro u_login no es válido.", 400)
            if not isinstance(post_id, int) or post_id <= 0:
                return response_error("El parámetro post_id no es válido.")

            # Obtener el ID del usuario por login
            user_id = PostComponent.get_user_id_by_login(u_login)
            if not user_id:
                return response_error(f"No se encontró un usuario con el login: {u_login}")

            # Obtener la publicación por ID y validar la relación con el usuario
            post_result = PostComponent.get_post_by_id_and_user(post_id, u_login)
            if post_result and post_result['result']:
                post_data = post_result['data']
                return response_success({
                    "username": post_data.get("u_login"),
                    "content": post_data.get("post_content"),
                    "image_url": post_data.get("post_image_url"),
                    "likes": post_data.get("post_likes"),
                    "modified": post_data.get("post_updated_at")
                })
            if not post_result:
                return response_error(f"No se encontró la publicación con el ID: {post_id} para el usuario: {u_login}")

            # Ajustar el formato de los datos para la respuesta

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error al obtener la publicación.")
