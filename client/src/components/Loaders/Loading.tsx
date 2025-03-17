const Loading = () => {
  
  const dotsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    marginBottom: '0.25rem',
  };

  const dotStyle = {
    height: '0.75rem',
    width: '0.75rem',
    marginRight: '0.625rem',
    borderRadius: '9999px',
    backgroundColor: '#ffffff',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  const dotLastChildStyle = {
    ...dotStyle,
    marginRight: '0',
  };

  const dotNthChild1Style = {
    ...dotStyle,
    animationDelay: '-0.3s',
  };

  const dotNthChild2Style = {
    ...dotStyle,
    animationDelay: '-0.1s',
  };

  const dotNthChild3Style = {
    ...dotStyle,
    animationDelay: '0.1s',
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              background-color: #b3d4fc;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
            50% {
              transform: scale(1.2);
              background-color: #4b79e4;
              box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
            }
            100% {
              transform: scale(0.8);
              background-color: #2584f8;
              box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
            }
          }
        `}
      </style>

      <div style={dotsContainerStyle}>
        <div style={dotNthChild1Style}></div>
        <div style={dotNthChild2Style}></div>
        <div style={dotNthChild3Style}></div>
        <div style={dotStyle}></div>
        <div style={dotLastChildStyle}></div>
      </div>
    </>
  );
};

export default Loading;