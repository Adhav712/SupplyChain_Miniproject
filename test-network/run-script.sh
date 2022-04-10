./network.sh down

docker volume prune -f

docker system prune -f

./network.sh up createChannel -ca -s couchdb

cd addOrg3

./addOrg3.sh up -ca -s couchdb


cd ..

./network.sh deployCC -ccn Supplychain_Contract -ccv 1 -cci InitLedger -ccp ../chaincode/Supplychain_Chaincode -ccl javascript