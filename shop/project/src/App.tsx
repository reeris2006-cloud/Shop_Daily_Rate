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
        background: "linear-gradient(135deg, #8B1538 0%, #4A0E1A 50%, #2C0A12 100%)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      {/* Header Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{
          background: "linear-gradient(45deg, #FFD700, #FFA500)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}>
          AML ஜுவல்லர்ஸ்
        </div>
        <div style={{
          color: "#E5E5E5",
          fontSize: "1.2rem",
          fontWeight: "300",
          letterSpacing: "1px"
        }}>
          Daily Precious Metals Rate Generator
        </div>
        <div style={{
          width: "100px",
          height: "3px",
          background: "linear-gradient(90deg, #FFD700, #FFA500)",
          margin: "20px auto",
          borderRadius: "2px"
        }}></div>
      </div>

      {/* Main Card */}
      <div style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 215, 0, 0.1)"
      }}>
        
        {/* Form Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#2C0A12"
        }}>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            margin: "0 0 10px 0",
            color: "#8B1538"
          }}>
            Enter Today's Rates
          </h3>
          <p style={{
            color: "#666",
            fontSize: "0.9rem",
            margin: "0"
          }}>
            Fill in the current market rates to generate your PDF
          </p>
        </div>

        {/* Gold Rate Input */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#8B1538",
            fontSize: "1rem"
          }}>
            🥇 Gold Rate (₹ per gram)
          </label>
          <input
            type="number"
            value={goldRate}
            onChange={(e) => setGoldRate(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px solid #E5E5E5",
              color: "#2C0A12",
              backgroundColor: "#FAFAFA",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box"
            }}
            placeholder="Enter current gold rate"
            onFocus={(e) => e.target.style.borderColor = "#FFD700"}
            onBlur={(e) => e.target.style.borderColor = "#E5E5E5"}
          />
        </div>

        {/* Silver Rate Input */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#8B1538",
            fontSize: "1rem"
          }}>
            🥈 Silver Rate (₹ per gram)
          </label>
          <input
            type="number"
            value={silverRate}
            onChange={(e) => setSilverRate(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px solid #E5E5E5",
              color: "#2C0A12",
              backgroundColor: "#FAFAFA",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box"
            }}
            placeholder="Enter current silver rate"
            onFocus={(e) => e.target.style.borderColor = "#C0C0C0"}
            onBlur={(e) => e.target.style.borderColor = "#E5E5E5"}
          />
        </div>

        {/* Date Input */}
        <div style={{ marginBottom: "25px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#8B1538",
            fontSize: "1rem"
          }}>
            📅 Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              borderRadius: "12px",
              border: "2px solid #E5E5E5",
              color: "#2C0A12",
              backgroundColor: "#FAFAFA",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box"
            }}
            onFocus={(e) => e.target.style.borderColor = "#4A90E2"}
            onBlur={(e) => e.target.style.borderColor = "#E5E5E5"}
          />
        </div>

        {/* Day Display */}
        <div style={{ marginBottom: "30px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#8B1538",
            fontSize: "1rem"
          }}>
            📆 Day of Week
          </label>
          <div style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            borderRadius: "12px",
            border: "2px solid #E5E5E5",
            backgroundColor: "#F8F9FA",
            color: dayOfWeek ? "#2C0A12" : "#999",
            fontWeight: dayOfWeek ? "600" : "normal",
            boxSizing: "border-box"
          }}>
            {dayOfWeek || "Select a date to see the day"}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            padding: "18px 20px",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            border: "none",
            borderRadius: "15px",
            background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
            color: "#2C0A12",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 20px rgba(255, 215, 0, 0.3)",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 12px 25px rgba(255, 215, 0, 0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 8px 20px rgba(255, 215, 0, 0.3)";
          }}
        >
          🎯 Generate Professional PDF
        </button>

        {/* Footer Info */}
        <div style={{
          textAlign: "center",
          marginTop: "25px",
          padding: "15px",
          backgroundColor: "rgba(139, 21, 56, 0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(139, 21, 56, 0.1)"
        }}>
          <div style={{
            color: "#8B1538",
            fontSize: "0.9rem",
            fontWeight: "600",
            marginBottom: "5px"
          }}>
            📞 Contact Information
          </div>
          <div style={{
            color: "#666",
            fontSize: "0.8rem",
            lineHeight: "1.4"
          }}>
            Phone: 9443555256, 9994114147<br />
            279, மேலராதவீதி, திருநெல்வேலி டவுண்
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
