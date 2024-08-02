from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def process_data():
    data = request.json.get('data', [])
    numbers = [x for x in data if x.isdigit()]
    alphabets = [x for x in data if x.isalpha()]
    highest_alphabet = [max(alphabets, key=str.lower)] if alphabets else []

    response = {
        "is_success": True,
        "user_id": "RaghavAnand_21082003",  # Replace with your actual user_id
        "email": "raghavanand024@gmail.com",     # Replace with your actual email
        "roll_number": "RA2111028010037",    # Replace with your actual roll number
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_alphabet": highest_alphabet
    }

    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
