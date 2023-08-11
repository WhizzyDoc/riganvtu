import requests
import json
from base64 import b64encode
import hashlib

class Monnify:
    def __init__(self, apiKey, clientSecretKey):
        self.apiKey = apiKey
        self.clientSecretKey = clientSecretKey

    """ Generates Token"""
    def generateToken(self):
        data = f"{self.apiKey}:{self.clientSecretKey}".encode()
        userAndPass = b64encode(data).decode("ascii")
        headers = { 'Authorization' : 'Basic %s' %  userAndPass }
        #print(headers)
        url = "https://api.monnify.com/api/v1/auth/login"
        r = requests.post(url, headers=headers)
        loadJson = json.loads(r.content)
        #print(loadJson['responseBody']['accessToken'])
        token = loadJson['responseBody']['accessToken']
        return token

    """ Create Reserve Account v1"""
    def createReserveAccount(self, accountReference, accountName, currencyCode, contractCode, customerEmail, customerName):
        rHeaders = {'Content-Type':"application/json", 'Authorization':"Bearer {0}".format(self.generateToken())}
        reserveAccUrl = "https://api.monnify.com/api/v1/bank-transfer/reserved-accounts"
        data = {
            "accountReference":accountReference,
            "accountName":accountName,
            "currencyCode":currencyCode,
            "contractCode":contractCode,
            "customerEmail":customerEmail,
            "customerName":customerName
            }
        createReserveAccount = requests.post(reserveAccUrl, data=json.dumps(data), headers=rHeaders)
        reserverR = json.loads(createReserveAccount.content)
        #print("==>", reserverR)
        return reserverR

    """Create Reserve Account v2"""
    def createReserveAccountV2(self, **kwargs):
        rHeaders = {'Content-Type':"application/json", 'Authorization':"Bearer {0}".format(self.generateToken())}
        reserveAccUrl = "https://api.monnify.com/api/v2/bank-transfer/reserved-accounts"

        data = {
            "accountReference": kwargs['accountReference'],
            "accountName": kwargs['accountName'],
            "currencyCode": kwargs['currencyCode'],
            "contractCode": kwargs['contractCode'],
            "customerEmail": kwargs['customerEmail'],
            "customerName": kwargs['customerName'],
            "getAllAvailableBanks": kwargs['getAllAvailableBanks']
        }
        createReserveAccount = requests.post(reserveAccUrl, data=json.dumps(data), headers=rHeaders)
        reserverR = json.loads(createReserveAccount.content)
        #print("==>", reserverR)
        return reserverR
        



    """ Check verify valid payment"""
    def createHashFromWebhook(self, paymentReference, amountPaid, paidOn, transactionReference):
        to_hash = f'{self.clientSecretKey}|{paymentReference}|{amountPaid}|{paidOn}|{transactionReference}'
        hash_value = hashlib.sha512(to_hash.encode()).hexdigest()
        return hash_value
    

    """GET TRANSACTION DETAILS"""
    def getTransactionDetails(self,transactionReference):
        rHeaders = {'Content-Type':"application/json", 'Authorization':"Bearer {0}".format(self.generateToken())}
        url = 'https://api.monnify.com/api/v2/transactions/'+transactionReference
        getTrans = requests.get(url, headers=rHeaders)
        details = json.loads(getTrans.content)
        return details
        
    # Initiate a transaction
    def initializeTransaction(self):
        rHeaders = {'Content-Type': "application/json", 'Authorization': "Bearer {0}".format(self.generateToken())}
        initTransUrl = "https://api.monnify.com/api/v2/bank-transfer/reserved-accounts"

        data = {
            "accountReference": '',
            "accountName": '',
            "currencyCode": '',
            "contractCode": '',
            "customerEmail": '',
            "customerName": '',
            "getAllAvailableBanks": ''
        }
        initTransaction = requests.post(initTransUrl, data=json.dumps(data), headers=rHeaders)
        transactionInfo = json.loads(initTransaction.content)
        # print("==>", reserverR)
        return transactionInfo