export const formatter = new Intl.NumberFormat("en-US", {
   style: 'currency',
   currency: 'USD'
});

export const delay = (delayInms: number) => {
   return new Promise(resolve => setTimeout(resolve, delayInms));
 };

//tailwind utils...