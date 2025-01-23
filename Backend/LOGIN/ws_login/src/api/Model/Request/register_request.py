from marshmallow import Schema, fields

class RegisterRequest(Schema):
    register_user = fields.String(required=True)
    register_password = fields.String(required=True)
    register_email = fields.Email(required=True)
    register_image = fields.String(required=False, allow_none=True)  # Base64 o URL de la imagen

