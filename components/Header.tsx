import Image from "next/image";
import Link from "next/link";
import CartAction from "./CartAction";
import CurrentCity from "./CurrentCity";
import { SearchHeader } from "./UI/input/SearchHeader";
import Menu from "./Menu";
import { DarkLight } from "./DarkLight";

export default function Header(
   {
      children
   }: {
      children: React.ReactNode
   }
) {

   return (
      <>
         <header className='header'>
            <div className="header__inner flex justify-end">
               <Menu />
               <Link className="logo" href="/">
                  <Image
                     src="/vercel.svg"
                     alt="Vercel Logo"
                     width={100}
                     height={50}
                     priority
                  />
               </Link>
               <DarkLight/>
               <CurrentCity />
               <SearchHeader />
               <CartAction />
            </div>
         </header>
         {children}
      </>
   )
}


/*
const [isFetching, setIsFetching] = useState(false);
const [isPending, startTransition] = useTransition();
const router = useRouter();

const isMutating = isFetching || isPending;

export default async function AddPost(){

   const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {

      const formData = new formData(e.currentTarget);

       setIsFetching(true);

      const res = await fetch('...',{  
      method: POST,
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify(
      {
         title: formData.get('title'),
         content: formData.get('content')
      }
   )
});

   await res.json();

   setIsFetching(false);

   startTransition(

      router.refresh();

   )

   }


   return (
   <div style={`${isMutating ? ...}`}>
   </div>
   )
}
*/