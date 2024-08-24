import Image from "next/image";
import QRCodeGenerator from '../components/QRCodeGenerator'

export default function Home() {
  return (
    <main className="">
        <QRCodeGenerator />
    </main>
  );
}
