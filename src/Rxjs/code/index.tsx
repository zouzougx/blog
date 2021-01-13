import React from 'react';
import 'rxjs/add/operator/observeOn';
import styles from './styles.less';

const Index: React.FC = props => {
  return (
    <div className={styles.contentWrap}>
      <div>{props.children}</div>
    </div>
  );
};
export default Index;
