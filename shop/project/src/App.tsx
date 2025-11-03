import { useState } from "react";

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

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size (A4 proportions: 210x297mm, scaled to pixels)
    canvas.width = 794;  // A4 width in pixels at 96 DPI
    canvas.height = 1123; // A4 height in pixels at 96 DPI

    if (!ctx) {
      alert('Canvas not supported');
      return;
    }

    const backgroundImg = new Image();
    backgroundImg.src = "/shopimg.png";

    backgroundImg.onload = () => {
      // Draw background image
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

      // Set text properties and add dynamic content
      ctx.font = 'bold 48px Girassol';
      ctx.fillStyle = '#E9C966'; // Gold color
      ctx.fillText(goldRate, 300, 540); // Gold rate position

      ctx.fillStyle = '#E9F0F3'; // Silver color  
      ctx.fillText(silverRate, 300, 625); // Silver rate position

      ctx.fillStyle = '#BFECAC'; // Date color
      ctx.fillText(selectedDate, 115, 720); // Date position
      ctx.fillText(dayOfWeek, 130, 795); // Day position

      // Convert canvas to image and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'AML_Jewellery_Rates.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    };

    backgroundImg.onerror = () => {
      // Fallback: create image without background
      console.log("Background image not found, creating image with solid background");
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#8B1538');
      gradient.addColorStop(0.5, '#4A0E1A');
      gradient.addColorStop(1, '#2C0A12');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text content
      ctx.font = 'bold 36px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.fillText('AML ஜுவல்லர்ஸ்', 50, 80);

      ctx.font = '24px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText("Today's Readymade Rate", 50, 130);
      ctx.fillText(`Gold Per Gram: ₹ ${goldRate}`, 50, 180);
      ctx.fillText(`Silver Per Gram: ₹ ${silverRate}`, 50, 230);
      ctx.fillText(`Date: ${selectedDate} (${dayOfWeek})`, 50, 280);
      ctx.fillText('Phone: 9443555256, 9994114147', 50, 330);
      ctx.fillText('279, மேலராதவீதி, திருநெல்வேலி டவுண்', 50, 380);

      // Convert canvas to image and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'AML_Jewellery_Rates.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
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
            const target = e.target as HTMLButtonElement;
            target.style.transform = "translateY(-2px)";
            target.style.boxShadow = "0 12px 25px rgba(255, 215, 0, 0.4)";
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.transform = "translateY(0)";
            target.style.boxShadow = "0 8px 20px rgba(255, 215, 0, 0.3)";
          }}
        >
          🎯 Generate Professional Image
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
