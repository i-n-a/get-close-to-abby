export default function ReflectionReveal({ data, onNext }) {
  return (
    <section>
      <section className="banner-wrapper">
        <div className="banner-section">
          <div className="banner-text step2Banner bodyL">
              <p>You did it</p> <p>You did it</p> <p>You did it</p> <p>You did it</p>{" "}
              <p>You did it</p> <p>You did it</p> <p>You did it</p> <p>You did it</p>{" "}
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
              <p>You did it</p>
          </div>
        </div>
      </section>

      <article className="revealInfo ">
        <div className="phone-side-margin layoutReveal">
          <img src={data.image_url} alt="Close-up detail" />
          <p className="bodyM bold">The creator of this close-up left you a message!</p>
          <div className=" relfectionSection">
            <p className="labelL">The message</p>
            <p className="reflection">{data.reflection_message}</p>
          </div>
        </div>
      </article>

      <article className="createCloseUpSection phone-side-margin">
        <p className="bodyL bold">Add your own close-up</p>
        <p>You looked closely...</p>
        <p>Now help someone else get close to Abby!</p>
        <button className="button button--m button--green spaceButton" onClick={onNext}> Create My Close-up </button>
        <p className="labelS">Create and upload your own close-up and another person will get it in their ticket.</p>
      </article>
    </section>
  );
}



