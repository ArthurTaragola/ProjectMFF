const getAPI = async function()
{
  questionList = [];
    try
    {
      console.log(niveau, thema)
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/`);
        for (let k = 0; k < data.length; k++)
        {
            questionList.push(data[k]);
        }
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    FillInData()
}