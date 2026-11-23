import React from 'react';

/** Surface rendering errors instead of letting the app collapse to a white page. */
export default class StartupErrorBoundary extends React.Component {
  constructor(props) {super(props);this.state={error:null,componentStack:""};}
  static getDerivedStateFromError(error) {return {error};}
  componentDidCatch(error, info) {console.error('Emerald Library render error:',error,info);this.setState({componentStack:info?.componentStack||''});}
  render() {
    if (this.state.error) return <main style={{maxWidth:760,margin:'60px auto',padding:24,fontFamily:'Arial,sans-serif',color:'#164c40'}}>
      <h1>Emerald Library — Error</h1>
      <p>React encountered an error while drawing the page. Send a screenshot of the message below.</p>
      <pre style={{whiteSpace:'pre-wrap',wordBreak:'break-word',color:'#9a2637',background:'#fff4f2',padding:18,borderRadius:12}}>{this.state.error.stack || String(this.state.error)}{this.state.componentStack ? `\n\nCOMPONENT STACK\n${this.state.componentStack}` : ''}</pre>
      <button onClick={()=>{try{localStorage.removeItem('emerald-library-favorites-v1');localStorage.removeItem('emerald-library-recent-v1');localStorage.removeItem('emerald-library-theme');}catch{}window.location.reload()}} style={{background:'#176d59',color:'white',border:0,borderRadius:8,padding:'12px 18px'}}>Clear saved settings and reload</button>
    </main>;
    return this.props.children;
  }
}
