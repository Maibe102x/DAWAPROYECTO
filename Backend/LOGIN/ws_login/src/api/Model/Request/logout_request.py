from marshmallow import Schema, fields

class LogoutRequest(Schema):
    logout_user = fields.String(required=True)
