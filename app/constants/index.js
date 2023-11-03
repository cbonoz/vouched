export const APP_NAME = 'Vouched'
export const APP_DESC = 'A modern referral network'

export const PRIMARY_COLOR = '#674ea7'


export const DEMO_PROFILE = {
    "user": {
        "firstName": "John",
        "lastName": "Doe",
    },
    "type": "received", // or "sent"
    "endorsements": [
        {
            "id": "123",
            "createdAt": new Date(),
            "message": "He is a great guy",
            "authorName": "Jane Doe",
            "authorImage": "/profile.png"
        },
        {
            "id": "124",
            "createdAt": new Date(),
            "message": "He is a great guy",
            "authorName": "Kane Doe",
            "authorImage": "/profile.png"
        },
        {
            "id": "125",
            "createdAt": new Date(),
            "message": "He is a great guy",
            "authorName": "Bill Doe",
            "authorImage": "/profile.png"
        }
    ]
}