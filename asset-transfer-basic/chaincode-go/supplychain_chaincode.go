
package main

import (
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-samples/asset-transfer-basic/chaincode-go/chaincode"
)

type Bill struct{
	Id 						string `json:"ID"`
	organizationRole        string `json:"organizationRole"`
	billReceipt             string `json:"billReceipt"`
}

func (s *SmartContract) CreateBill(ctx contractapi.TransactionContextInterface, id string, orgRole string, billReceipt string) error {
	exists, err := s.billExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the bill %s already exists", id)
	}

	bill := Bill{
		ID:            		   id,
		organizationRole:      orgRole,
		billReceipt:           billReceipt,
	}
	billJSON, err := json.Marshal(bill)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, billJSON)
}


// billExists returns true when asset with given ID exists in world state
func (s *SmartContract) billExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	billJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return billJSON != nil, nil
}