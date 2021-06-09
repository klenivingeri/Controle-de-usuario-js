class Utils{
  static  dateFormat(date){
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes();
    }
}

/** Essa classe não precisa  de ser estanciada, já podemos chamar direito,
 * mas pra isso precimos colocar o static
 */