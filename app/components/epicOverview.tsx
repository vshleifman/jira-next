const EpicOverview = ({epic}: {epic: string}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex border-2 border-black p-2">
        <span className="basis-full">Epic: {epic}</span>
        <span className="basis-auto">x</span>
      </span>
      <div className="flex gap-2">
        <div className="basis-3/4 border-2 border-black p-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
          corrupti, facilis mollitia ullam voluptas, esse laudantium
          perspiciatis vitae possimus quas voluptatem cum pariatur dolor
          quisquam ratione? Molestias facilis autem nulla!
        </div>
        <div className="basis-1/4 border-2 border-black p-2">delete</div>
      </div>
      <span className="border-2 border-black p-2">progress</span>
      <div className="flex flex-col border-2 border-black p-2">
        {/* {Array(10)
          .fill("item")
          .map((item) => (
            <div key={item}>{item}</div>
          ))} */}
      </div>
    </div>
  );
};

export default EpicOverview;
