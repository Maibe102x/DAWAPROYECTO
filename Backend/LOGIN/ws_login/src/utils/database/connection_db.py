#Permitir conectarme a una base de datos PostgreSQl
import psycopg2
import psycopg2.extras
from psycopg2.extras import RealDictCursor

from ..general.config import Parametros
from ..general.logs import HandleLogs
from ..general.response import internal_response


def conn_db():
    return psycopg2.connect(host=Parametros.db_host,
                            port=int(Parametros.db_port),
                            user=Parametros.db_user,
                            password=Parametros.db_pass,
                            database=Parametros.db_name,
                            cursor_factory=RealDictCursor)

class DataBaseHandle:
    @staticmethod
    def getRecords(query, tamanio, record=()):
        try:
            result = False
            message = None
            data = None

            conn = conn_db()
            cursor = conn.cursor()

            # Ejecutar la consulta con o sin parámetros
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            # Manejar los resultados según el tamaño solicitado
            if tamanio == 0:
                res = cursor.fetchall()
            elif tamanio == 1:
                res = cursor.fetchone()
            else:
                res = cursor.fetchmany(tamanio)

            if res:  # Si hay resultados
                data = res
                result = True
                message = "Exitoso"
            else:  # Si no hay resultados
                data = None
                message = "Sin resultados"
        except Exception as ex:
            HandleLogs.write_error(ex)
            message = ex.__str__()
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
            return internal_response(result, data, message)

    #ejecuta metodos de tipo INSERT-UPDATE-DELETE
    @staticmethod
    def ExecuteNonQuery(query, record):
        try:
            result = False
            message = None
            data = None
            conn = conn_db()
            cursor = conn.cursor()
            if len(record) == 0:
                cursor.execute(query)
            else:
                cursor.execute(query, record)

            if query.find('INSERT') > -1:
                cursor.execute('SELECT LASTVAL()')
                ult_id = cursor.fetchone()['lastval']
                conn.commit()
                data = ult_id
            else:
                data = 0
            conn.commit()
            result = True
        except Exception as ex:
            HandleLogs.write_error(ex)
            message = ex.__str__()
        finally:
            cursor.close()
            conn.close()
            return internal_response(result, data, message)

