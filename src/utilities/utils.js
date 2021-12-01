const checkValidRequest = (receivedKeys, allowedKeys) => {
    return receivedKeys.every((key) => allowedKeys.includes(key))
}

const checkMinKeysInRequest = (receivedKeys, minAllowedKeys) => {
    return minAllowedKeys.every((key) => receivedKeys.includes(key))
}

module.exports = {
    checkValidRequest,
    checkMinKeysInRequest
}