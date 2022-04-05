
package chaincode

import (
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/SupplyChain_Miniproject/Supplychain_Chaincode"
)

type Bill struct{
	Id 						string `json:"ID"`
	organizationRole        string `json:"organizationRole"`
	billReceipt             string `json:"billReceipt"`
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	bills := []Bill{
		{ID: "Bill1", organizationRole: "Manufacturer", Size: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.aJB-CvRfUH13gpdPTCY7IQHaEK%26pid%3DApi&f=1`},
		{ID: "Bill1", organizationRole: "Producer", Size: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TSHmDzushvy52VdllZvPMgHaEK%26pid%3DApi&f=1`}
	}

	for _, asset := range assets {
		assetJSON, err := json.Marshal(asset)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(asset.ID, assetJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
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