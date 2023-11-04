export const APP_NAME = 'Vouched'
export const APP_DESC = 'A modern referral network'

export const PRIMARY_COLOR = '#674ea7'


export const DEMO_PROFILE = {
    "user": {
        "firstName": "John",
        "lastName": "Doe",
        "createdAt": new Date()
    },
    "type": "received", // or "sent"
    "endorsements": [
        {
            "id": "123",
            "createdAt": new Date(),
            "message": "He is a great guy",
            "authorHandle": "jane-doe",
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

export const FIELDS = [
    {
        'label': 'email',
        'key': 'email',
        'disabled': true
    },
    {
        'label': 'first name',
        'key': 'firstName'
    },
    {
        'label': 'last name',
        'key': 'lastName'
    },
    {
        'label': 'handle (defines your url, must be unique)',
        'key': 'username'
    },
]