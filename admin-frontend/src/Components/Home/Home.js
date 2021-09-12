export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md text-center">
          <div style={styles.admimSections}>
            <div style={styles.title}>Deliveries</div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }}>Date:&nbsp;&nbsp;</div>
              <div>placeholder</div>
            </div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }}>Rider Name:&nbsp;&nbsp;</div>
              <div>placeholder</div>
            </div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }}>
                Request Status:&nbsp;&nbsp;
              </div>
              <div>placeholder</div>
            </div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }}>
                Mode of transport:&nbsp;&nbsp;
              </div>
              <div>placeholder</div>
            </div>
            <div style={styles.contentText}>
              <br />
              <br />
              <div style={styles.button}>Apply Filter</div>
            </div>
          </div>
        </div>
        <div className="col-md text-center">
          <div style={styles.admimSections}>
            <div style={styles.title}>Search Requests</div>
            <div style={styles.contentText}>
              <div style={{ fontWeight: "bold" }}>
                Enter Order #&nbsp;&nbsp;
              </div>
              <div>placeholder</div>&nbsp;&nbsp;
              <div style={styles.button}>Fetch order</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    color: "#AE1818",
    marginTop: 5,
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  admimSections: {
    border: "0.05rem solid black",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    height: "90vh",
  },
  contentText: {
    width: "100%",
    textAlign: "left",
    margin: "0.5rem 0.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF7978",
    color: "white",
    padding: "2px 50px",
    fontSize: "0.75rem",
    borderRadius: 5,
  },
};
