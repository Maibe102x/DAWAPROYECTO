from marshmallow import Schema, fields, validate

class PostRequest(Schema):
    u_login = fields.String(required=True)
    post_content = fields.String(required=False)
    post_image_url = fields.String(required=False, allow_none=True)
    post_likes = fields.Integer(required=True)
