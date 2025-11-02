import { useState } from "react";
import { jsPDF } from "jspdf";

function App() {
  const [goldRate, setGoldRate] = useState("6800");
  const [silverRate, setSilverRate] = useState("165");
  const [selectedDate, setSelectedDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (date) {
      const dateObj = new Date(date);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      setDayOfWeek(days[dateObj.getDay()]);
    } else {
      setDayOfWeek('');
    }
  };

  const handleDownload = () => {
    if (!goldRate || !silverRate || !selectedDate) {
      alert('Please fill in all fields before downloading');
      return;
    }

    const doc = new jsPDF("p", "mm", "a4"); // portrait A4
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const img = new Image();
    img.src = "/shopimg.png"; // background image from public/

    img.onload = () => {
      // 🖼️ Draw full-page background
      doc.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);

      // Use dynamic data from form inputs
      doc.setFont("Girassol", "normal");
      doc.setFontSize(32);
      doc.setTextColor(233, 201, 102);
      doc.text(goldRate, 80, 142); // Dynamic gold rate
      doc.setTextColor(233, 240, 243);
      doc.text(silverRate, 80, 165); // Dynamic silver rate
      doc.setFont("Girassol", "normal");
      doc.setFontSize(32);
      doc.setTextColor(191, 236, 172);
      doc.text(selectedDate, 30, 190); // Dynamic date
      doc.text(dayOfWeek, 34, 210); // Dynamic day

      doc.save("AML_Jewellery_Background.pdf");
    };

    img.onerror = () => {
      // Fallback: create PDF without background image
      console.log("Image not found, creating PDF without background");
      
      // Create a simple colored background
      doc.setFillColor(139, 21, 56); // maroon color
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Add text content with dynamic data
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text("AML ஜுவல்லர்ஸ்", 20, 30);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text("Today's Readymade Rate", 20, 50);
      doc.text(`Gold Per Gram: ₹ ${goldRate}`, 20, 65);
      doc.text(`Silver Per Gram: ₹ ${silverRate}`, 20, 80);
      doc.text(`Date: ${selectedDate} (${dayOfWeek})`, 20, 95);
      doc.text("Phone: 9443555256, 9994114147", 20, 110);
      doc.text("279, மேலராதவீதி, 50, கூலக்கடைப்பஜார்,", 20, 125);
      doc.text("திருநெல்வேலி டவுண்.", 20, 140);

      doc.save("AML_Jewellery_Background.pdf");
    };
  };

  return (
    <div
      style={{
        textAlign: "center",
        background: "#2c0000",
        color: "white",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingBottom: "30px",
      }}
    >
      <h2>AML ஜுவல்லர்ஸ் - Daily Rates PDF</h2>
      
      <div style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "10px",
        marginTop: "20px"
      }}>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Gold Rate (₹):
          </label>
          <input
            type="number"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              color: "#2c0000"
            }}
            placeholder="Enter gold rate"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Silver Rate (₹):
          </label>
          <input
            type="number"
            value={silverRate}
            onChange={(e) => setSilverRate(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              color: "#2c0000"
            }}
            placeholder="Enter silver rate"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              color: "#2c0000"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Day:
          </label>
          <input
            type="text"
            value={dayOfWeek}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#f0f0f0",
              color: "#666"
            }}
            placeholder="Day will appear automatically"
          />
        </div>

        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            padding: "12px 20px",
            fontSize: "18px",
            cursor: "pointer",
            border: "none",
            borderRadius: "8px",
            background: "gold",
            color: "#2c0000",
            fontWeight: "bold",
          }}
        >
          Generate PDF with Current Rates
        </button>
      </div>
    </div>
  );
}

export default App;
