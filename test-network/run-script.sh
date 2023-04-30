
cd ..

curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh

./install-fabric.sh docker samples binary

cd ./test-network

./network.sh down

docker volume prune -f

docker system prune -f

./network.sh up createChannel -ca -s couchdb

cd addOrg3

./addOrg3.sh up -ca -s couchdb


cd ..

./network.sh deployCC -ccn HyperBaseAuth -ccv 1 -cci InitLedger -ccp ../chaincode/Supplychain_Chaincode -ccl javascript

cd ../Server/controllers/wallet

rm *.id

cd ../../

npm start

# cd  ../../../Fabric-explorer
# ${PWD}

# rm -rf organizations

# cd ../test-network
# ${PWD}

# cp -r ${PWD}/organizations  ${PWD}/../Fabric-explorer/

# cd ../Fabric-explorer
# ${PWD}

# docker volume prune -f

# docker system prune -f

# echo "Remainder change the private key value in the test-network.json file and run this command docker-compose up -d"

# docker-compose down
