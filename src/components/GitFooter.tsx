const version = process.env.REACT_APP_VERSION;

const GitFooter: React.FC = () => {
  return (
    <footer className="d-flex justify-content-center mt-auto py-3 my-3">
        <a href="https://github.com/jabbate19/yards-frontend">
            <span>YARDS ({version})</span>
        </a>
    </footer>
  )
  };

export default GitFooter;
