/** @file Collection of variables that contain the global state for transaction form data */

import type { OnApplicationComplete, TransactionType } from 'algosdk';
import { type PrimitiveAtom, atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

/** Data common to all transaction types */
export interface BaseTxnData {
  /** Type */
  type: Omit<TransactionType, 'stpf'>;
  /** Sender */
  snd: string;
  /** Note */
  note?: string;
  /** Fee */
  fee: number;
  /** First valid round */
  fv: number;
  /** Last valid round */
  lv: number;
  /** Rekey to */
  rekey?: string;
  /** Lease */
  lx?: string;
}
/** Data for a payment transaction */
export interface PaymentTxnData extends BaseTxnData {
  type: TransactionType.pay;
  /** Receiver */
  rcv: string;
  /** Amount */
  amt: number;
  /** Close remainder to */
  close?: string;
}
/** Data for a asset transfer transaction */
export interface AssetTransferTxnData extends BaseTxnData {
  type: TransactionType.axfer;
  /** Asset receiver */
  arcv: string;
  /** Asset ID */
  xaid: number,
  /** Asset amount */
  aamt: number|string; // String because the number could be larger than 2^53 - 1
  /** Revocation target */
  asnd?: string;
  /** Close remainder of asset to */
  aclose?: string;
}
/** Data for a asset configuration transaction */
export interface AssetConfigTxnData extends BaseTxnData {
  type: TransactionType.acfg;
  /** Asset ID */
  caid?: number;
  /** Unit name */
  apar_un?: string;
  /** Asset name */
  apar_an?: string;
  /** Total */
  apar_t?: number|string;
  /** Number of decimals places */
  apar_dc?: number;
  /** Frozen by default? */
  apar_df?: boolean;
  /** URL */
  apar_au?: string;
  /** Manager address */
  apar_m?: string;
  /** Freeze address */
  apar_f?: string;
  /** Clawback address */
  apar_c?: string;
  /** Reserve address */
  apar_r?: string;
  /** Metadata hash */
  apar_am?: string;
}
/** Data for a asset freeze transaction */
export interface AssetFreezeTxnData extends BaseTxnData {
  type: TransactionType.afrz;
  /** Asset ID */
  faid: number;
  /** Freeze address */
  fadd: string;
  /** Freeze? */
  afrz: boolean;
}
/** Data for a key registration transaction */
export interface KeyRegTxnData extends BaseTxnData {
  type: TransactionType.keyreg;
  /** Voting key */
  votekey: string;
  /** Selection key */
  selkey: string;
  /** State proof key */
  sprfkey: string;
  /** First voting round */
  votefst?: number;
  /** Last voting round */
  votelst?: number;
  /** Voting key dilution */
  votekd?: number;
  /** Nonparticipation */
  nonpart: boolean;
}
/** Data for the transaction being built */
export interface TxnData {
  /** Genesis ID (retrieved from currently connected node) */
  gen: string;
  /** Genesis hash (retrieved from currently connected node) */
  gh: string;
  /** Transaction form data */
  txn: BaseTxnData
    | PaymentTxnData
    | AssetTransferTxnData
    | AssetConfigTxnData
    | AssetFreezeTxnData
    | KeyRegTxnData; // TODO: Add other transaction types;
};
/** Box reference */
type BoxRef = {
  /** ID of the application that contains the box */
  i: PrimitiveAtom<number>,
  /** Name of box to reference */
  n: PrimitiveAtom<string>,
};

/* Code adapted from https://github.com/pmndrs/jotai/discussions/1220#discussioncomment-2918007 */
const storage = createJSONStorage<any>(() => sessionStorage);
/** Transaction form data that is temporarily stored locally */
export const storedTxnDataAtom = atomWithStorage<TxnData|undefined>('txnData', undefined, storage);
/** Signed transaction, as a Data URI string, that is stored locally */
export const storedSignedTxnAtom =
  atomWithStorage<string|undefined>('signedTxn', undefined, storage);

/** Collection of Jotai atoms containing  */
export const txnDataAtoms = {
  /** Transaction type */
  txnType: atom<Omit<TransactionType, 'stpf'>|undefined>(undefined),
  /** Sender */
  snd: atom<string>(''),
  /** Fee */
  fee: atom<number|undefined>(undefined),
  /** Note */
  note: atom<string|undefined>(undefined),
  /** First round */
  fv: atom<number|undefined>(undefined),
  /** Last round */
  lv: atom<number|undefined>(undefined),
  /** Lease */
  lx: atom<string>(''),
  /** Rekey to */
  rekey: atom<string>(''),

  /*
   * Payment
   */

  /** Payment - Receiver */
  rcv: atom<string>(''),
  /** Payment - Amount */
  amt: atom<number|undefined>(undefined),
  /** Payment - Close remainder to */
  close: atom<string>(''),

  /*
   * Asset Transfer
   */

  /** Asset transfer - Asset ID */
  xaid: atom<number|undefined>(undefined),
  /** Asset transfer - Revocation Target (the account from which the asset will be revoked) */
  asnd: atom<string>(''),
  /** Asset transfer - Asset receiver */
  arcv: atom<string>(''),
  /** Asset transfer - Asset amount */
  aamt: atom<number|string>(''),
  /** Asset transfer - Close remainder of asset to */
  aclose: atom<string>(''),

  /*
   * Asset Configuration
   */

  /** Asset configuration - Asset ID */
  caid: atom<number|undefined>(undefined),
  /** Asset configuration - Unit name */
  apar_un: atom<string>(''),
  /** Asset configuration - Asset name */
  apar_an: atom<string>(''),
  /** Asset configuration - Total */
  apar_t: atom<number|string>(''),
  /** Asset configuration - Number of decimals places */
  apar_dc: atom<number|undefined>(undefined),
  /** Asset configuration - Frozen by default? */
  apar_df: atom<boolean>(false),
  /** Asset configuration - URL */
  apar_au: atom<string>(''),
  /** Asset configuration - Manager address */
  apar_m: atom<string>(''),
  /** Asset configuration - Freeze address */
  apar_f: atom<string>(''),
  /** Asset configuration - Clawback address */
  apar_c: atom<string>(''),
  /** Asset configuration - Reserve address */
  apar_r: atom<string>(''),
  /** Asset configuration - Metadata hash */
  apar_am: atom<string>(''),

  /*
   * Asset Freeze
   */

  /** Asset freeze - Asset ID */
  faid: atom<number|undefined>(undefined),
  /** Asset freeze - Freeze address */
  fadd: atom<string>(''),
  /** Asset freeze - Freeze asset? */
  afrz: atom<boolean>(false),

  /*
   * Application
   */

  /** Application - Application ID */
  apid: atom<number|undefined>(undefined),
  /** Application - OnComplete (Action type) */
  apan: atom<OnApplicationComplete|undefined>(undefined),
  /** Application - Application arguments */
  apaa: atom<(string|number)[]>([]),

  /*
   * Application properties
   */

  /** Application properties - Approval program */
  apap: atom<string|Uint8Array|undefined>(undefined),
  /** Application properties - Clear-state program */
  apsu: atom<string|Uint8Array|undefined>(undefined),
  /** Application properties - Number of global integers */
  apgs_nui: atom<number|undefined>(undefined),
  /** Application properties - Number of global bytes slices */
  apgs_nbs: atom<number|undefined>(undefined),
  /** Application properties - Number of local integers */
  apls_nui: atom<number|undefined>(undefined),
  /** Application properties - Number of local bytes slices */
  apls_nbs: atom<number|undefined>(undefined),
  /** Application properties - Number of extra program pages */
  apep: atom<number|undefined>(undefined),

  /*
   * Application dependencies
   */

  /** Application dependencies - Foreign accounts */
  apat: atom<string[]>([]),
  /** Application dependencies - Foreign applications */
  apfa: atom<number[]>([]),
  /** Application dependencies - Foreign assets */
  apas: atom<number[]>([]),
  /** Application dependencies - Box references */
  apbx: atom<BoxRef[]>([]),

  /*
   * Key Registration
   */

  /** Key Registration - Voting key */
  votekey: atom<string>(''),
  /** Key Registration - Selection key */
  selkey: atom<string>(''),
  /** Key Registration - State proof key */
  sprfkey: atom<string>(''),
  /** Key Registration - First voting round */
  votefst: atom<number|undefined>(undefined),
  /** Key Registration - Last voting round */
  votelst: atom<number|undefined>(undefined),
  /** Key Registration - Voting key dilution */
  votekd: atom<number|undefined>(undefined),
  /** Key Registration - Nonparticipation */
  nonpart: atom<boolean>(false),

};
