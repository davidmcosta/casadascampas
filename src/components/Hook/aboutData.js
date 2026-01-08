// Server pe render hota hai
export async function getServerSideProps() {
  // Yeh server pe chalega
  const data = await fetch(`*[_type == 'about`);
  return { props: { data } };
}

// Ya phir static generation
export async function getStaticProps() {
  // Build time pe server pe chalega
  return { props: { data } };
}