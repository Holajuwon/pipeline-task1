## Getting Started

- `git clone https://github.com/Holajuwon/pipeline-task1.git`
- `cd pipeline-task1.git`
- `npm start`

## Requirements
- Nodejs v12 or an higher version
- npm 

## Route

**POST** `/api/v1/validate`

Request Header

```json
{
  "Authorization": "Bearer *********"
}
```

## Sample Request

```json
{
  "mobile": "08012345678",
  "cvv": "123",
  "cardName": "Adeola Omomama",
  "cardNumber": "5238801032609491",
  "expiryDate": "07/21",
  "email": "askamaya@gmail.com"
}
```

## Sample Sucess Response

```json
{
  "status": "success",
  "message": "successfully and exquisitely done",
  "valid": true,
  "code": 200
}
```

## Sample Error Response

```json
{
  "status": "fail",
  "code": 400,
  "message": "validation error",
  "error": [
    {
      "mobile": ["this field cannot be empty"]
    }
  ],
  "valid": false
}
```
