from marshmallow import Schema, fields

class UpdateUserRequest(Schema):
    u_login = fields.String(required=False)
    u_email = fields.Email(required=False)
    u_state = fields.Boolean(required=False)