import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Terms = () => {
  return (
    <div>
      <Card className="p-8">
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>
            These are our terms of service for the Vouched app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          This app is currently in beta and is provided as-is without any
          guarantees. By using this app, you agree that we are not responsible
          for any damages or data loss.
        </CardContent>
        <CardFooter>
          <p>Thanks for using Vouched!</p>
        </CardFooter>
      </Card>
    </div>
  )
}
export default Terms
