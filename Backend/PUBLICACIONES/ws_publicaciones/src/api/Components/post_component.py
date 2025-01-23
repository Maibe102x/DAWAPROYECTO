from ws_publicaciones.src.utils.general.logs import HandleLogs
from ws_publicaciones.src.utils.database.connection_db import DataBaseHandle
from ws_publicaciones.src.utils.general.response import internal_response


class PostComponent:
    @staticmethod
    def create_post(u_login, post_content,post_likes,post_image_url=None):
        try:
            data = None
            message = None
            result = False

            sql = """
                        INSERT INTO public.tb_posts (u_login, post_content, post_image_url, post_likes)
                        VALUES (%s, %s, %s, %s)
                        RETURNING post_id, post_created_at
                    """

            record = (
                u_login,
                post_content,
                post_image_url,
                post_likes
            )
            register_result = DataBaseHandle.ExecuteNonQuery(sql, record)

            if register_result['result']:
                result = True
                message = 'Registro exitoso'
            else:
                HandleLogs.write_log('Error al ejecutar Register ->' + register_result['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el registro -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def get_all_post():
        try:
            result = False
            data = None
            message = None

            sql = """
                SELECT
                post_id, 
                u_login, 
                post_content, 
                post_image_url, 
                post_likes,
                TO_CHAR(post_created_at, 'YYYY-MM-DD HH24:MI:SS') AS post_created_at 
            FROM 
                public.tb_posts
            ORDER BY 
                post_created_at DESC;
            """
            result_post = DataBaseHandle.getRecords(sql, 0)

            if result_post['result']:
                result = True
                data = result_post['data']
            else:
                message = result_post('message')

        except Exception as err:
            HandleLogs.write_log("Error al Buscar POSTS" + str(err))
            HandleLogs.write_error(err)
            message = 'Ocurrio un Error al Buscar POSTS' + err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def update_post_by_author_and_id(u_login, post_id, post_content,post_image_url):
        try:
            data = None
            message = None
            result = False

            # Consulta para verificar si el post pertenece al autor
            verify_sql = """
                SELECT post_id
                FROM public.tb_posts
                WHERE u_login = %s AND post_id = %s
            """
            result = DataBaseHandle.ExecuteNonQuery(verify_sql, (u_login, post_id))

            if not result:
                HandleLogs.write_error(f"No se encontró un post con ID {post_id} para el autor: {u_login}")
                return None

            # Consulta para actualizar el post
            update_sql = """
                UPDATE public.tb_posts
                SET post_content = %s, post_image_url = %s, post_updated_at = NOW()
                WHERE post_id = %s
            """
            record = (post_content,post_image_url,post_id)
            rows_affected = DataBaseHandle.ExecuteNonQuery(update_sql, record)

            return rows_affected
        except Exception as err:
            HandleLogs.write_error(err)
            message = 'Error en el registro -> ' + err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def delete_post(post_id):
        try:
            sql = "DELETE FROM public.tb_posts WHERE post_id = %s"
            record = (post_id,)
            return DataBaseHandle.ExecuteNonQuery(sql, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def like_post(post_id):
        try:
            sql = """
                UPDATE public.tb_posts
                SET post_likes = post_likes + 1, post_updated_at = NOW()
                WHERE post_id = %s
                RETURNING post_id
            """
            record = (post_id,)
            return DataBaseHandle.ExecuteNonQuery(sql, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def get_post_by_id_and_user(post_id, u_login):
        """
        Obtiene la publicación por ID y valida que pertenezca al usuario proporcionado.
        """
        try:
            sql = """
                SELECT p.u_login, p.post_content, p.post_image_url, p.post_likes,
                       TO_CHAR(p.post_updated_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS post_updated_at
                FROM public.tb_posts p
                INNER JOIN public.tb_user u ON p.u_login = u.u_login
                WHERE p.post_id = %s AND u.u_login = %s
            """
            record = (post_id, u_login)

            # Ejecutar la consulta y obtener los datos
            return DataBaseHandle.getRecords(sql, 1, record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None

    @staticmethod
    def get_user_id_by_login(u_login):
        """
        Obtiene el ID de un usuario basado en su login.
        """
        try:

            sql_user = "SELECT u_id FROM public.tb_user WHERE u_login = %s"
            user_record = (u_login,)
            return DataBaseHandle.getRecords(sql_user, 1, user_record)
        except Exception as err:
            HandleLogs.write_error(err)
            return None


