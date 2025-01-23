from flask import request
from flask_restful import Resource
from ws_usuario.src.api.Components.user_component import UserComponent
from ws_usuario.src.utils.general.logs import HandleLogs
from ws_usuario.src.api.Model.Request.user_upload_photo import UploadPhotoRequest
from ws_usuario.src.utils.general.response import response_error, response_success

class UploadPhotoService(Resource):
    @staticmethod
    def post(user_id):
        try:
            # Validar que se envíe un JSON con la URL de la imagen
            rq_json = request.get_json()
            if not rq_json:
                return response_error("La solicitud debe contener un JSON válido.")

            # Validar el JSON recibido
            upload_request = UploadPhotoRequest()
            errors = upload_request.validate(rq_json)
            if errors:
                HandleLogs.write_log("Error al validar el request ->" + str(errors))
                return response_error("Error al validar el request ->" + str(errors))

            image_url = rq_json['image_url']

            # Verificar y actualizar la URL de la foto del usuario
            user = UserComponent.get_user_by_id(user_id)
            if user and user['result']:
                current_photo = user['data'].get('u_image_url')
                default_photo = "/default-avatar.png"

                if current_photo == default_photo or not current_photo:
                    UserComponent.update_photo(user_id, image_url)
                    return response_success("Foto de perfil actualizada.")
                else:
                    UserComponent.update_photo(user_id, image_url)
                    return response_success("Foto de perfil reemplazada.")

            return response_error("Usuario no encontrado.")

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error al actualizar la foto de perfil.")
