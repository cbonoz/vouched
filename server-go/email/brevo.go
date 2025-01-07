package email

import (
	"context"
	"fmt"

	brevo "github.com/getbrevo/brevo-go/lib"
)

func InitBrevo() {

	var ctx context.Context
	cfg := brevo.NewConfiguration()
	//Configure API key authorization: api-key
	cfg.AddDefaultHeader("api-key", "YOUR_API_KEY")
	//Configure API key authorization: partner-key
	cfg.AddDefaultHeader("partner-key", "YOUR_API_KEY")

	br := brevo.NewAPIClient(cfg)
	result, resp, err := br.AccountApi.GetAccount(ctx)
	if err != nil {
		fmt.Println("Error when calling AccountApi->get_account: ", err.Error())
		return
	}
	fmt.Println("GetAccount Object:", result, " GetAccount Response: ", resp)
	return

}
