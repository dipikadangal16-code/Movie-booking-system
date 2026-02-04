export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} CineBook. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "15px",
  },
};
