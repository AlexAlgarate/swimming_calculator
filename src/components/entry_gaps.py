import tkinter as tk


class EntryGap(tk.Entry):
    """
    A customized entry widget with adjustable relative positioning and size.

    Parameters:
        parent (tk.Tk): The parent tkinter window.
        name (str): The name of the entry.
        background (str): The background color of the entry.
        relx_value (float): Relative x-coordinate of the entry.
        rely_value (float): Relative y-coordinate of the entry.
        relwidth_value (float): Relative width of the entry.
        relheight_value (float, optional): Relative height of the
            entry. Default is 0.1.
    """

    def __init__(
        self,
        parent: tk.Tk,
        name: str,
        background: str,
        relx_value: float,
        rely_value: float,
        relwidth_value: float,
        relheight_value: float = 0.1,
    ):
        super().__init__(parent, background=background)
        self.place(
            relx=relx_value,
            rely=rely_value,
            relwidth=relwidth_value,
            relheight=relheight_value,
        )
        self.name = name
