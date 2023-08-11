import style from './Button.module.css'
export const Button = ({
  btnType, 
  text, 
  onClick,
  className,
  disabled,
    ...rest}) => {
    return (
      <button 
      disabled={disabled}
      onClick={onClick}
      className={[
        style['btn-default'],
        btnType === 'search' ? style['btn-search'] : '',
        btnType === 'close' ? style['btn-close'] : '',
        btnType === 'submit' ? style['btn-submit'] : '',
        className ? className : '',
      ].join(' ')}
      {...rest}
    >   
        {text}
      </button>
    );
  }