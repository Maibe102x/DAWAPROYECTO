from marshmallow import Schema, fields, validate

class UpdatePostRequest(Schema):
    u_login = fields.String(required=True,error_messages={"required": "El campo 'autor' es obligatorio."})
    post_content = fields.String(required=False)
    post_image_url = fields.String(required=False, allow_none=True)

