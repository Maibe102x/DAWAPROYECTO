from marshmallow import Schema, fields

class ResetPasswordRequest(Schema):
    reset_email = fields.Email(required=True)
    reset_new_password = fields.String(required=True)
