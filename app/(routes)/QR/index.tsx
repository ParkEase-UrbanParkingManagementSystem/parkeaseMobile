import QRScreen from '@/screens/QR/QR.screen'
import { useRoute } from '@react-navigation/native';
export default function HomePage() {

    const router = useRoute()
    // const { userID, vehicleID } = router.params
    console.log(router.params)

    return (
        <QRScreen userID={"10"} vehicleID={"30"} />
        // <QRScreen userID={userID} vehicleID={vehicleID} />
    )
}
